class MNISTLoader {

    constructor() {
        this.files = [
            ['train_images', 'data/train-images.idx3-ubyte', 'images'],
            ['train_labels', 'data/train-labels.idx1-ubyte', 'labels'],
            ['test_images', 'data/t10k-images.idx3-ubyte', 'images'],
            ['test_labels', 'data/t10k-labels.idx1-ubyte', 'labels']
        ]

        this.data = {}
    }

    load() {
        return new Promise((resolve, reject) => {
            let nFilesLeftToLoad = this.files.length

            this.files.forEach(file => {
                this.loadFile(file[1], file[2]).then(content => {
                    this.data[file[0]] = content
                    nFilesLeftToLoad--

                    if (nFilesLeftToLoad == 0) {
                        resolve()
                    }
                })
            })
        })
    }

    loadFile(url, filetype) {
        return new Promise((resolve, reject) => {
            fetch(url).then(r => r.arrayBuffer()).then(buffer => {
                let uintArray = new Uint8Array(buffer)

                if (filetype === 'images') {
                    uintArray = uintArray.slice(16)
                } else if (filetype === 'labels') {
                    uintArray = uintArray.slice(8)
                }

                resolve(uintArray)
            })
        })
    }
}
