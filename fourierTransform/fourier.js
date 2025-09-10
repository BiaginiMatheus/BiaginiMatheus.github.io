// Discrete Fourier Transform (DFT) implementation in JavaScript
// X(k) = Σ (from n=0 to N-1) x_n * e^(-i*2π*k*n/N)
// X(k) = Σ (from n=0 to N-1) x_n * (cos(2πkn/N) - i*sin(2πkn/N))
function discreteFourierTransform(signal) {
    const N = signal.length;
    const result = [];
    for (let k = 0; k < N; k++) {
        let sum = new Complex(0,0);
        for (let n = 0; n < N; n++) {
            const angle = (2 * Math.PI * k * n) / N;
            const equation = new Complex(Math.cos(angle), -Math.sin(angle));
            sum = sum.add(signal[n].multiply(equation));
        }
        sum.real = sum.real / N;
        sum.imag = sum.imag / N;
        let freq = k;
        let amp = Math.sqrt(sum.real * sum.real + sum.imag * sum.imag);
        let phase = Math.atan2(sum.imag, sum.real);
        result[k] = {...sum, freq, amp, phase};
    }
    result.sort((current, previous) => previous.amp - current.amp)

    return result;
}
