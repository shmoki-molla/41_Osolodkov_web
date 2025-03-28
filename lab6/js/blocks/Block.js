export default class Block {
    constructor() {
      if (new.target === Block) {
        throw new Error("Block is an abstract class and cannot be instantiated directly.");
      }
    }
  
    render() {
      throw new Error("Method 'render' must be implemented.");
    }
  }