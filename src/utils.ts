export function u8ArrayToBytes(array: Uint8Array) {
  let ret = "";
  for (let e of array) {
    ret += String.fromCharCode(e);
  }
  return ret;
}

// TODO this function is a bit broken and the type can't be string
// TODO for more info: https://github.com/near/near-sdk-js/issues/78
export function bytesToU8Array(bytes: any): Uint8Array {
  let ret = new Uint8Array(bytes.length);
  for (let i in bytes) {
    ret[i] = bytes.charCodeAt(i);
  }
  return ret;
}

export function bytes(strOrU8Array: string | Uint8Array): string {
  if (typeof strOrU8Array == "string") {
    return checkStringIsBytes(strOrU8Array);
  } else if (strOrU8Array instanceof Uint8Array) {
    return u8ArrayToBytes(strOrU8Array);
  }
  throw new Error("bytes: expected string or Uint8Array");
}

function checkStringIsBytes(str: string) {
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      throw new Error(
        `string ${str} at index ${i}: ${str[i]} is not a valid byte`
      );
    }
  }
  return str;
}
