import { Command } from "commander";
import { promises as fs } from "fs";
import path from "path";

export default class ArgumentParser {
  static async parseArguments(args) {
    // First, manually check if we have enough arguments and validate boxes
    const userArgs = args.slice(2); // Remove 'node' and script name

    if (userArgs.length === 0) {
      throw new Error("Missing required arguments: <boxes> <morty>");
    }

    // Validate boxes first, even if morty is missing
    const boxesArg = userArgs[0];
    if (!/^\d+$/.test(boxesArg)) {
      throw new Error(
        `Invalid boxes: ${boxesArg} (must be a positive integer)`
      );
    }

    const boxes = parseInt(boxesArg, 10);
    if (isNaN(boxes) || boxes < 3) {
      throw new Error(`Invalid boxes: ${boxesArg} (must be at least 3)`);
    }

    // Now check if morty argument is provided
    if (userArgs.length < 2) {
      throw new Error("Missing required argument: <morty>");
    }

    const program = new Command();
    program
      .name("randm")
      .description("Rick and Morty CLI Game")
      .version("1.0.0")
      .argument("<boxes>", "Number of boxes")
      .argument("<morty>", "Path to Morty implementation");

    program.parse(args);

    const morty = program.args[1];
    const mortyPath = path.resolve(process.cwd(), morty);
    await fs.access(mortyPath);
    return { boxes, mortyPath };
  }
}
