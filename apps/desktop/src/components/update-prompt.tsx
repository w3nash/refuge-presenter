import { useEffect, useState } from "react"
import { isTauri } from "@tauri-apps/api/core"
import { relaunch } from "@tauri-apps/plugin-process"
import { check } from "@tauri-apps/plugin-updater"
import type { Update } from "@tauri-apps/plugin-updater"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@workspace/ui/components/progress"

type State =
  | { status: "idle" }
  | { status: "available"; update: Update }
  | {
      status: "installing"
      update: Update
      downloaded: number
      total: number | undefined
    }
  | { status: "failed"; update: Update; message: string }

/**
 * Checks GitHub Releases for a newer signed build once per launch and offers
 * to install it. Dev builds and the browser-only frontend skip the check.
 */
export function UpdatePrompt() {
  const [state, setState] = useState<State>({ status: "idle" })

  useEffect(() => {
    if (import.meta.env.DEV || !isTauri()) return

    let cancelled = false
    check()
      .then((update) => {
        if (update && !cancelled) setState({ status: "available", update })
      })
      .catch((error: unknown) => {
        // Offline, or latest.json isn't uploaded yet for a new release.
        console.warn("Update check failed", error)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (state.status === "idle") return null

  const { update } = state

  function dismiss() {
    void update.close()
    setState({ status: "idle" })
  }

  async function install() {
    setState({ status: "installing", update, downloaded: 0, total: undefined })
    try {
      await update.downloadAndInstall((event) => {
        setState((current) => {
          if (current.status !== "installing") return current
          switch (event.event) {
            case "Started":
              return { ...current, total: event.data.contentLength }
            case "Progress":
              return {
                ...current,
                downloaded: current.downloaded + event.data.chunkLength,
              }
            case "Finished":
              return current
          }
        })
      })
      await relaunch()
    } catch (error) {
      setState({
        status: "failed",
        update,
        message: error instanceof Error ? error.message : String(error),
      })
    }
  }

  const installing = state.status === "installing"
  const percent =
    installing && state.total
      ? Math.min(100, Math.round((state.downloaded / state.total) * 100))
      : null

  return (
    <AlertDialog
      open
      onOpenChange={(open) => {
        if (!open && !installing) dismiss()
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update available</AlertDialogTitle>
          <AlertDialogDescription>
            Refuge Presenter {update.version} is ready to install. You have{" "}
            {update.currentVersion}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {update.body ? (
          <p className="max-h-40 overflow-y-auto text-sm whitespace-pre-line text-muted-foreground">
            {update.body}
          </p>
        ) : null}

        {installing ? (
          <Progress value={percent}>
            <ProgressLabel>Downloading</ProgressLabel>
            <ProgressValue />
          </Progress>
        ) : null}

        {state.status === "failed" ? (
          <p className="text-sm text-destructive">
            The update couldn&apos;t be installed: {state.message}
          </p>
        ) : null}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={installing}>Later</AlertDialogCancel>
          <AlertDialogAction
            disabled={installing}
            onClick={() => void install()}
          >
            {state.status === "failed" ? "Try again" : "Install and restart"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
