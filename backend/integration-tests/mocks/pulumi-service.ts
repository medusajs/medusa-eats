export class PulumiServiceMock {
  async ensureCodeBuildEvents() {
    console.log("hi from mock")
    return "mocked stack"
  }
}
