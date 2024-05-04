import { Readable, Writable, Transform } from 'node:stream'

class OneToHundreadStream extends Readable {
  index = 1
  
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buff = Buffer.from(' ' + String(i))
        this.push(buff)
      }
    }, 1000)
  }
}

class MultiplyByTenSteam extends Writable {
  _write (chunk, encode, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform (chunk, encode, callback) {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed)))
  }
}

// new OneToHundreadStream().pipe(process.stdout)
new OneToHundreadStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenSteam())