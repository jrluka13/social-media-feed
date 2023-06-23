import { Injectable } from '@angular/core';


@Injectable()
export class StorageService {
  /**
   * Serializes and sets the value of the pair identified by the key to the value in the Local Storage, creating a new
   * key/value pair if none existed for the key previously
   *
   * @param key - The name of the key you want to create/update
   * @param value - The value you want to give the key you are creating/updating
   * @public
   */
  public setItem<T>(key: string, value: T): void {
    const serializedValue: string = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
  }

  /**
   * Returns and deserializes the current value associated with the given key in the Local Storage, or null if the
   * given key does not exist
   *
   * @param key - The name of the key you want to retrieve the value of
   * @returns - The value of the key, or null if the key does not exist
   * @public
   */
  public getItem<T>(key: string): T | null {
    const serializedValue: string | null = localStorage.getItem(key);
    const value: T | null = serializedValue ? JSON.parse(serializedValue) : null;

    return value;
  }

  /**
   * Removes the key/value pair with the given key from the list associated with the object in the Local Storage, if a
   * key/value pair with the given key exists
   *
   * @param key - The name of the key you want to remove
   * @public
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears all key/value pairs from the Local Storage
   *
   * @public
   */
  public clear(): void {
    localStorage.clear();
  }
}
