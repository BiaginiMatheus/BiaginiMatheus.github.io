// Discrete Fourier Transform (DFT) implementation in JavaScript
// X(k) = Σ (from n=0 to N-1) x_n * e^(-i*2π*k*n/N)
// X(k) = Σ (from n=0 to N-1) x_n * (cos(2πkn/N) - i*sin(2πkn/N))
function discreteFourierTransform(signal) {
    const N = signal.length;
    const result = [];
    for (let k = 0; k < N; k++) {
        let real = 0;
        let imag = 0;
        for (let n = 0; n < N; n++) {
            const angle = (2 * Math.PI * k * n) / N;
            real += signal[n] * Math.cos(angle);
            imag -= signal[n] * Math.sin(angle);
        }
        real = real / N;
        imag = imag / N;
        let freq = k;
        let amp = Math.sqrt(real * real + imag * imag);
        let phase = Math.atan2(imag, real);
        result[k] = {real, imag, freq, amp, phase};
    }
    return result;
}
// Fourier series -> Square wave
// https://www.youtube.com/watch?v=Mm2eYfj0SgA&t=1s
// Fourier transform -> Draw with two axes
// https://www.youtube.com/watch?v=MY4luNgGfms&t=1s
// Fourier transform with imaginary numbers
// https://www.youtube.com/watch?v=7_vKzcgpfvU
