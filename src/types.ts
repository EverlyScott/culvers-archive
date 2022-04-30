export interface IFileInfo {
  isSubDirectory: boolean;
  name: string;
  extension?: string;
  displayMethod: DisplayMethods;
}

export type DisplayMethods = "image" | "text" | "markdown" | "hidden" | "directory";
