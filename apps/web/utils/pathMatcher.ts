export const pathMatched = (pathToMatchWith: string, pathsToMatch: RegExp[]) => {
  let pathMatched = false;
  for (let pathtoMatch of pathsToMatch) {
    const matched = pathToMatchWith.match(pathtoMatch)
    if (matched != null && matched?.length > 0) {
      pathMatched = true;
      break;
    }
  }
  return pathMatched;
}