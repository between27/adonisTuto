class CacheService {
  #store: Record<string, any> = {}

  has(key: string): boolean {
    return key in this.#store
  }

  get(key: string): any {
    return this.#store[key]
  }

  set(key: string, value: any): void {
    this.#store[key] = value
  }

  delete(key: string): void {
    delete this.#store[key]
  }
}

const cache = new CacheService()
export default cache
