class App {
    constructor() {
        createCanvas(28, 28)
        noLoop()

        this.waitForLoadings = true
        this.mnist = new MNISTLoader()
        this.neuralNetwork = new NeuralNetwork(28*28, [10, 10], 10)

        this.predictionIndex = null
        this.mnist.load().then(() => this.mnistLoaded())

        window.mnist = this.mnist
        window.predict = this.predictForIndex.bind(this)
        window.nn = this.neuralNetwork
        window.train = this.train.bind(this)
    }

    mnistLoaded() {
        this.waitForLoadings = false

        this.predictForIndex(0)
    }

    train(nTimes) {
        for (let i = 0; i < nTimes; i++) {
            let randomIndex = Math.floor(random(0, 59990))
            let inputs = this.inputsForIndex(randomIndex)
            let labels = [0,0,0,0,0,0,0,0,0,0]
            labels[this.mnist.data.train_labels[randomIndex]] = 1
            this.neuralNetwork.train(inputs, labels)

            if (i % 100 === 0) {
                console.log('Training progress: '+(i/nTimes * 100).toFixed(2)+'%')
            }
        }
        console.log('Training complete')
    }

    inputsForIndex(index) {
        let arr = []
        let startIndex = index * 28*28
        for (let i = startIndex; i < startIndex + 28*28; i++) {
            arr.push(this.mnist.data.train_images[i])
        }
        return arr
    }

    predictForIndex(index) {
        this.predictionIndex = index
        draw()
        let predictions = this.neuralNetwork.predict(this.inputsForIndex(index))
        console.log('prediction is:')
        console.table(predictions)
        console.log('Answer should be ' + this.mnist.data.train_labels[index])
    }

    showImageAtIndex(index) {
        let mnistOffset = index * 28*28
        loadPixels()
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let c = this.mnist.data.train_images[mnistOffset + x + y * width]
                pixels[x*4 + y * width*4 + 0] = c
                pixels[x*4 + y * width*4 + 1] = c
                pixels[x*4 + y * width*4 + 2] = c
                pixels[x*4 + y * width*4 + 3] = 255
            }
        }
        updatePixels()
    }

    draw() {
        background(10)

        if (this.waitForLoadings) return

        this.showImageAtIndex(this.predictionIndex)
    }
}
