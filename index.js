class App {
    constructor() {
        createCanvas(window.innerWidth, window.innerHeight)
        frameRate(3)

        this.neuralNetwork = new NeuralNetwork(1, [1], 1)
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


        window.nn = this.neuralNetwork

        let centerN = this.neuralNetwork.hiddenLayers[0].neurons[0]
        centerN.ins[0].weight = 0.5
        centerN.outs[0].weight = 0.5

        /*let guess = this.neuralNetwork.predict([1, 1])
        console.log("Guesses are :" + guess)
        console.log("Expecting : " + [0])

        let guess2 = this.neuralNetwork.predict([1, 0])
        console.log("Guesses are :" + guess2)
        console.log("Expecting : " + [1])
*/

        //console.log('--- train ---')

/*
        let test = random(trainingData)
        let guess3 = this.neuralNetwork.predict(trainingData[0].inputs)
        console.log("Guesses are : " + guess3)
        console.log("Expecting : " + trainingData[0].answer)

/*
        let guess4 = this.neuralNetwork.predict([1, 0])
        console.log("Guesses are :" + guess4)
        console.log("Expecting : " + 1)
*/
    this.draw()
    }

    draw() {
        this.trainingData = [
            {inputs: [1], answer: [0]}
        ]

        for (let i = 0; i < 100; i++) {
            let training = random(this.trainingData)
            this.neuralNetwork.train(training.inputs, training.answer)
        }

        background(10)
        this.neuralNetwork.draw()
    }
}
