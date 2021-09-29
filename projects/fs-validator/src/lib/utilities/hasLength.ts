/**
 * Checks if an array has length.
 * 
 * @param arr The array
 * @returns true if the array has length, false otherwise
 */
export function hasLength(arr:any[]):boolean {
    if (arr && arr.length) {
        return true
    }
    return false
}