class Matrix {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.data = Array.from({length: rows}, () => Array(cols).fill(0))
    }

    randomize() {
        this.data.forEach((row, i) => {
            this.data[i] = row.map((col) => {
                return Math.floor(Math.random() * 10)
            })
        })
    }

    add(v) {
        if (v instanceof Matrix) {
            this.data.forEach((row, i) => {
                row.forEach((col, j) => {
                    this.data[i][j] += v.data[i][j]
                })
            })
        } else {
            this.data.forEach((row, i) => {
                row.forEach((col, j) => {
                    this.data[i][j] += v
                })
            })
        }
    }


    mult(v) {
        this.data.forEach((row, i) => {
            row.forEach((col, j) => {
                this.data[i][j] *= v
            })
        })
    }

    map(fn) {
        this.data.forEach((row, i) => {
            this.data[i] = row.map(fn)
        })
    }

    log() {
        console.table(this.data)
    }

    static mult(m1, m2) {
        let result = new Matrix(m1.rows, m2.cols)

        result.data.forEach((row, resultRowIndex) => {
            row.forEach((col, resultColIndex) => {
                let sum = 0

                for (let i = 0; i < m1.cols; i++) {
                    sum += m1.data[resultRowIndex][i] * m2.data[i][resultColIndex]
                }

                result.data[resultRowIndex][resultColIndex] = sum
            })
        })

        return result
    }

    static from1dArray(arr) {
        let m = new Matrix(arr.length, 1)
        
        arr.forEach((v, i) => {
            m.data[i][0] = arr[i]
        })

        return m
    }
}
