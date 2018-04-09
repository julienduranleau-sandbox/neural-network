class Neuron {

    constructor(name) {
        this.name = name
        this.ins = []
        this.outs = []
        this.bias = 0 //Math.random() * 2 - 1
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
        this.value = NeuralNetwork.tanh(this.tmpSumValue + this.bias)
        this.tmpSumValue = 0
    }

    setErrorFromLabel(label) {
        this.errorOffset = this.value - label
        //console.log("value is " + (this.value - label))
        //console.log(this.name + " erroroffset is " + this.errorOffset)
    }

    backPropagate() {
        this.ins.forEach(connection => connection.backPropagate())
    }

    computeErrorValues() {
        this.errorOffset = this.tmpSumError
        this.errorOffset = 0
    }

    applyDeltaWeights() {
        this.outs.forEach(connection => connection.applyDeltaWeights())
        let deltaBias = 0.1 * this.errorOffset * NeuralNetwork.dtanh(this.value, true)
    }

    draw(drawOffsets) {
        this.lastDrawOffset = {x: drawOffsets.x, y: drawOffsets.y }

        this.ins.forEach(connection => connection.draw())

        fill(this.value * 125 + 125)
        noStroke()
        ellipse(drawOffsets.x, drawOffsets.y, 15)

        textSize(11)
        noStroke()
        fill(255)
        text(this.value.toFixed(2), this.lastDrawOffset.x - 10, this.lastDrawOffset.y - 10)
    }
}
