class App {
    constructor() {
        createCanvas(window.innerWidth, window.innerHeight)
        frameRate(1)

        this.neuralNetwork = new NeuralNetwork(2, [3], 1)

        // debug training data
        // this.trainingData = [
        //     // {inputs: [1], answer: [0]}
        //     {inputs: [0], answer: [0]}
        // ]


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

        this.stepTraining(30000)
        console.log(this.neuralNetwork.predict([0,1]), " be 1")
        console.log(this.neuralNetwork.predict([1,0]), " be 1")
        console.log(this.neuralNetwork.predict([0,0]), " be 0")
        console.log(this.neuralNetwork.predict([1,1]), " be 0")

        this.draw()

        // exposed for debug purposes only
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

    draw() {
        background(10)
        this.neuralNetwork.draw({ x: 100, y: 20 })
    }
}
