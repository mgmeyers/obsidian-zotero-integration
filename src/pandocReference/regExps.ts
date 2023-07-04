export const citeRegExp =
  /(?<=^|[.;\s-[])(?:(\[)([^[\]@\n\r]*)((?:@[^@\s[\];,'"|]+(?:; *)?)+)([^;[\]]*)(\])|(@[^@\s[\];,'"|]+)(?:( *)(\[)([^[\]]+)(\]))?)/g;
//                   1   2             3                             4         5    6                   7   8   9        10
// 1,5,8,10 -> formatting
// 2,4,7,9  -> extra
// 6        -> citekey
// 3        -> multicitekey
//

// For splitting group 3 above
export const multiCiteRegExp = /(@[^@\s[\];,'"|]+)(; *)?/g;

// General purpose
export const citekeyRegExp = /(@[^@\s[\];,'"|]+)/g;
