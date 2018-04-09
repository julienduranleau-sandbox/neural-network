class NeuronConnection {
    constructor(a, b, weight) {
        this.a = a
        this.b = b
        this.weight = weight || (Math.random() * 2 - 1)
    }

    feedForward() {
        this.b.tmpSumValue += this.a.value * this.weight
    }

    backPropagate() {
        this.a.tmpSumError += this.b.errorOffset * this.weight
    }

    applyDeltaWeights() {
        let deltaWeight = 0.1 * this.b.errorOffset * NeuralNetwork.tanh(this.b.value, true) * this.a.value
        this.weight += deltaWeight
    }

    draw() {
        stroke(255)
        strokeWeight(1)
        line(this.a.lastDrawOffset.x, this.a.lastDrawOffset.y, this.b.lastDrawOffset.x, this.b.lastDrawOffset.y)

        textSize(9)
        noStroke()
        fill(255)
        let a = Math.atan2(this.b.lastDrawOffset.y - this.a.lastDrawOffset.y, this.b.lastDrawOffset.x - this.a.lastDrawOffset.x)
        let len = 30
        text(this.weight.toFixed(2), this.a.lastDrawOffset.x + Math.cos(a) * len, this.a.lastDrawOffset.y + Math.sin(a) * len)
    }
}
