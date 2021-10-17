package main

import (
    "fmt"
    "net/http"
    "os/exec"
)

func startDeploy(w http.ResponseWriter, req *http.Request) {
    fmt.Fprintf(w, "OK")

    go deploy();
}

func deploy() {
  cmd := exec.Command("/bin/sh", "build.sh")
  cmd.Dir = "/opt/application/webhook"
  cmd.Run()
}

func main() {
    http.HandleFunc("/startDeploy", startDeploy)
    http.ListenAndServe(":8090", nil)
}
