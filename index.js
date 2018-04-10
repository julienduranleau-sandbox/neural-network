class App {
    constructor() {
        createCanvas(window.innerWidth, window.innerHeight)
        frameRate(1)

        this.neuralNetwork = new NeuralNetwork(2, [2], 1)

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

        this.neuralNetwork.train([0,1], [1])

        this.draw()

        // exposed for debug purposes only
        window.nn = this.neuralNetwork
        window.step = this.stepTraining.bind(this)

        /*
        step(1000000)
        console.log(nn.predict([0,1]), "should be 1")
        console.log(nn.predict([1,0]), "should be 1")
        console.log(nn.predict([0,0]), "should be 0")
        console.log(nn.predict([1,1]), "should be 0")
        */
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
