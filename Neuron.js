class Neuron {

    constructor(name) {
        this.name = name
        this.ins = []
        this.outs = []
        this.bias = Math.random()
        this.value = 0
        this.errorOffset = 0
        this.tmpSumValue = 0
        this.tmpSumError = 0
        this.lastDrawOffset = null
    }

    connect(otherNeuron) {
        let connection = new NeuronConnection(this, otherNeuron)
        this.addNewOutboundConnection(connection)
        otherNeuron.addNewInboundConnection(connection)
    }

    sumOfWeightsForOutgoingConnections() {
        return this.outs.reduce((sum, connection) => sum += connection.weight, 0)
    }

    addNewInboundConnection(connection) {
        this.ins.push(connection)
    }

    addNewOutboundConnection(connection) {
        this.outs.push(connection)
    }

    feedForward() {
        this.outs.forEach(connection => connection.feedForward())
    }

    computeFeedValues() {
        this.value = NeuralNetwork.sigmoid(this.tmpSumValue + this.bias)
        this.tmpSumValue = 0
    }

    setErrorFromLabel(label) {
        this.errorOffset = label - this.value
        /*
        console.log("Error label for " + this.name)
        console.log("value is " + this.value + " and should be " + label)
        console.log("error offset is " + this.errorOffset)
        */
    }

    backPropagate() {
        this.ins.forEach(connection => connection.backPropagate())
    }

    computeErrorValues() {
        console.log('setting error '+this.tmpSumError+'for '+this.name)
        this.errorOffset = this.tmpSumError
        this.tmpSumError = 0
    }

    applyDeltaWeights() {
        this.outs.forEach(connection => connection.applyDeltaWeights())
        let deltaBias = NeuralNetwork.learningRate * this.errorOffset
        this.bias += deltaBias
    }

    draw(drawOffsets) {
        this.lastDrawOffset = {x: drawOffsets.x, y: drawOffsets.y }

        fill(this.value * 125 + 125)
        noStroke()
        rect(drawOffsets.x - 30, drawOffsets.y - 30, 60, 60, 10);

        textSize(11)
        noStroke()
        fill(0)
        text("val: "+this.value.toFixed(2), this.lastDrawOffset.x - 22, this.lastDrawOffset.y - 12)
        text("bias: "+this.bias.toFixed(2), this.lastDrawOffset.x - 22, this.lastDrawOffset.y + 3)
        text("err: "+this.errorOffset.toFixed(2), this.lastDrawOffset.x - 22, this.lastDrawOffset.y + 18)

        this.ins.forEach(connection => connection.draw())
    }

    drawConnections(drawOffsets) {
        this.lastDrawOffset = {x: drawOffsets.x, y: drawOffsets.y }
        this.ins.forEach(connection => connection.drawConnections())
    }
}
