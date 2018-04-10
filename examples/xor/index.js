class App {
    constructor() {
        createCanvas(2, 2)
        frameRate(60)

        this.neuralNetwork = new NeuralNetwork(2, [3], 1)

        // XOR training
        this.trainingData = [
            {
                inputs: [0,0],
                answer: [0]
            }, {
                inputs: [1,1],
                answer: [0]
            }, {
                inputs: [1,0],
                answer: [1]
            }, {
                inputs: [0,1],
                answer: [1]
            }
        ]

        this.draw()

        window.nn = this.neuralNetwork
        window.step = this.stepTraining.bind(this)
    }

    stepTraining(nSteps) {
        nSteps = nSteps || 1

        for (let i = 0; i < nSteps; i++) {
            let training = random(this.trainingData)
            this.neuralNetwork.train(training.inputs, training.answer)
        }
    }

    update() {
        this.stepTraining(10)
    }

    draw() {
        this.update()
        background(10)

        loadPixels()
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let prediction = this.neuralNetwork.predict([x,y])
                let c = prediction[0] * 255
                pixels[x*4 + y * width*4 + 0] = c
                pixels[x*4 + y * width*4 + 1] = c
                pixels[x*4 + y * width*4 + 2] = c
                pixels[x*4 + y * width*4 + 3] = 255
            }
        }
        updatePixels()
    }
}
