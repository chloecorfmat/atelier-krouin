package main

import (
    "fmt"
    "net/http"
    "os/exec"
    "bufio"
)

func startDeploy(w http.ResponseWriter, req *http.Request) {
    fmt.Fprintf(w, "OK")

    go deploy();
}

func deploy() {
  cmd := exec.Command("/bin/sh", "build.sh")
  cmd.Dir = "/opt/application/webhook"
  fmt.Println("START DEPLOY")
  stdout, _ := cmd.StdoutPipe()
  cmd.Start()

  scanner := bufio.NewScanner(stdout)
  scanner.Split(bufio.ScanWords)
  for scanner.Scan() {
      m := scanner.Text()
      fmt.Println(m)
  }
  cmd.Wait()
  fmt.Println("DEPLOY ENDED")
}

func main() {
    http.HandleFunc("/startDeploy", startDeploy)
    http.ListenAndServe(":8090", nil)
}
