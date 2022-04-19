if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (search, pos) {
    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  };
}

export const startsWithArray = (targetString, searchStrings) => {

  if (
    !(typeof targetString === 'string') || !(searchStrings instanceof Array)
  ) return false;

  for (let s of searchStrings) {
    if (targetString.startsWith(s)) {
      return true;
    }
  }

  return false;

}

export const isInclude = (targetArray, searchStrings) => {

  let result = false;

  if (typeof targetArray === 'object' && typeof searchStrings === 'string') {
    for (let s of targetArray) {
      result = result || s?.includes(searchStrings);
    }
    return result;
  }
  return false;

}
