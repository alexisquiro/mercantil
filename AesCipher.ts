import * as crypto from 'crypto';

class AesCipher {
  private static readonly OPENSSL_CIPHER_NAME = 'aes-128-ecb';
  private static readonly CIPHER_KEY_LEN = 16; // 128 bits

  /**
   * Encripta datos en AES ECB de 128 bit key
   *
   * @param keybank - Clave enviada
   * @returns keybankhash Hash en sha 256 de la clave enviada por el banco
   */
  static createKeyhash(keybank: string): Buffer {
    const keybankhash = crypto.createHash('sha256').update(keybank).digest();
    return keybankhash;
  }

  /**
   * Selecciona los primeros 16 byte del hash de la clave
   *
   * @param key - Hash en sha 256 de la clave enviada por el banco
   * @returns key 16 bytes de del hash de la clave enviada por el Banco
   */
  private static fixKey(key: Buffer): Buffer {
    if (key.length < AesCipher.CIPHER_KEY_LEN) {
      // 0 pad to len 16
      return Buffer.concat([key, Buffer.alloc(AesCipher.CIPHER_KEY_LEN - key.length)]);
    }

    if (key.length > AesCipher.CIPHER_KEY_LEN) {
      // truncate to 16 bytes
      return key.slice(0, AesCipher.CIPHER_KEY_LEN);
    }

    return key;
  }

  /**
   * Encripta datos en AES ECB de 128 bit key
   *
   * @param key - Clave enviada por el banco debe ser de 16 bytes en sha-256
   * @param data - Datos a ser cifrados
   * @returns encrypted Datos cifrados
   */
  static encrypt(key: Buffer, data: string): string {
    const cipher = crypto.createCipheriv(AesCipher.OPENSSL_CIPHER_NAME, AesCipher.fixKey(key), null);
    let encryptedData = cipher.update(data, 'utf8', 'base64');
    encryptedData += cipher.final('base64');
    return encryptedData;
  }

  /**
   * Desencripta datos en AES ECB de 128 bit key
   *
   * @param key - Clave enviada por el banco debe ser de 16 bytes en sha-256
   * @param data - Datos a ser cifrados
   * @returns decrypted Datos Desencriptados
   */
  static decrypt(key: Buffer, data: string): string {
    const decipher = crypto.createDecipheriv(AesCipher.OPENSSL_CIPHER_NAME, AesCipher.fixKey(key), null);
    let decryptedData = decipher.update(data, 'base64', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
  }
}

/**
 *
 * Ejemplo para cifrar y descifrar datos intercambios
 * pos los API de Mercantil Banco
 *
 */

console.log('Genera del CVV y la clave telefonica cifrada');

// CVV a Encripta
const cvv = '752';

// Clave secreta enviada por el Banco
const keybank = 'A9279120481620090622AA30';

// Generacion del hash a partir de la clave secreta del banco
const keyhash = AesCipher.createKeyhash(keybank);

// Encripta el CVV
const cvvencrypt = AesCipher.encrypt(keyhash, cvv);

// Des-Encripta
const decrypted = AesCipher.decrypt(keyhash, cvvencrypt);

console.log(`CVV utilizado     : ${cvv}`);
console.log(`CVV Encriptado    : ${cvvencrypt}`);
console.log(`CVV Des-Encriptado: ${decrypted}`);
