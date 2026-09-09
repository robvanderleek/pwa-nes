interface Rom {
    name: string;
    data: ArrayBuffer;
    cpu?: object;
    ppu?: object;
    mmap?: object;
}