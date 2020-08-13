declare module "worker-loader?name=editor-assets/worker/worker.js!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
