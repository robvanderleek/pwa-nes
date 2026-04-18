interface Rom {
    name: string;
    data: string;
    cpu?: object;
    ppu?: object;
    mmap?: object;
}