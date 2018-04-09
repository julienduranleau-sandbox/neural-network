class NeuralNetwork {
    constructor(nInputs, nHiddenList, nOutputs) {
        this.inputLayer = new NeuronLayer('Inputs', nInputs)
        this.hiddenLayers = []
        this.outputLayer = new NeuronLayer('Outputs', nOutputs)

        nHiddenList.forEach((nHiddens, i) => {
            this.hiddenLayers.push(new NeuronLayer('Hidden '+i, nHiddens))
        })

        this.connectLayers()
    }

    connectLayers() {
        // input to first hidden layer
        this.inputLayer.connect(this.hiddenLayers[0])

        // every hidden layer to the previous hidden
        for (let i = 0; i < this.hiddenLayers.length - 1; i++) {
            this.hiddenLayers[i].connect(this.hiddenLayers[i + 1])
        }

        // last hidden to output layer
        this.hiddenLayers[this.hiddenLayers.length - 1].connect(this.outputLayer)
    }

    feedForward(inputs) {
        this.inputLayer.setValues(inputs)
        this.inputLayer.feedForward()
    }

    predict(inputs) {
        this.feedForward(inputs)
        return this.outputLayer.getValues()
    }

    train(inputs, labels) {
        this.feedForward(inputs)
        this.outputLayer.setErrorsFromLabels(labels)
        this.outputLayer.backPropagate()
    }

    static sigmoid(x) {
        return 1 / (1 + Math.exp(-x))
    }

    static dsigmoid(x, skipSigmoid) {
        if (skipSigmoid) {
            return x * (1 - x)
        } else {
            return this.sigmoid(x) * (1 - this.sigmoid(x))
        }
    }

    static tanh(x) {
        return Math.tanh(x)
    }

    static dtanh(x, skipTanh) {
        if (skipTanh) {
            return 1 - (x * x)
        } else {
            return 1 - (tanh(x) * tanh(x))
        }
    }

    draw() {
        let drawOffsets = { x: 100, y: 100 }
        this.inputLayer.draw(drawOffsets)

        this.hiddenLayers.forEach(hiddenLayer => {
            drawOffsets.x += 100
            hiddenLayer.draw(drawOffsets)
        })

        drawOffsets.x += 100
        this.outputLayer.draw(drawOffsets)
    }

}
