export default class CifradoHelper {
  static getKey() {
    return import.meta.env.VITE_SECRET_KEY || "";
  }

  static toBase64Url(bytes) {
    let bin = String.fromCharCode(...bytes);
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  static fromBase64Url(str) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) str += "=";
    let bin = atob(str);
    return Uint8Array.from(bin, c => c.charCodeAt(0));
  }

  static cifrar(texto) {
    const key = this.getKey();
    const data = new TextEncoder().encode(texto);
    const keyBytes = new TextEncoder().encode(key);

    const out = data.map((b, i) => b ^ keyBytes[i % keyBytes.length]);
    return this.toBase64Url(out);
  }

  static descifrar(token) {
    const key = this.getKey();
    const keyBytes = new TextEncoder().encode(key);
    const data = this.fromBase64Url(token);

    const out = data.map((b, i) => b ^ keyBytes[i % keyBytes.length]);
    return new TextDecoder().decode(out);
  }
}