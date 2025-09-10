class Complex{
    constructor(x, y) {
        this.real = x;
        this.imag = y;
    }

    add(other) {
        return new Complex(this.real + other.real, this.imag + other.imag);
    }

    // To multiply two complex numbers
    // (a + bi)(c + di) = (ac - bd) + (ad + bc)i
    // where a = this.real, b = this.imag
    //      c = other.real, d = other.imag
    multiply(other) {
        const realPart = this.real * other.real - this.imag * other.imag;
        const imagPart = this.real * other.imag + this.imag * other.real;
        return new Complex(realPart, imagPart);
    }
}
