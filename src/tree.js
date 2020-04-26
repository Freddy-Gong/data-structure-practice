const createTree = (value) => {
    return {
        data: value,
        children: null,
        parent: null
    }
}

const addChildren = (node, value) => {
    const newNode = {
        data: value,
        children: null,
        parent: node
    }
    node.children = node.children || []
    node.children.push(newNode)
    return newNode
}

const find = (tree, node) => {
    if (tree === node) {
        return tree
    } else if (tree.children) {
        for (let i = 0; i < tree.length; i++) {
            const result = find(tree.children, node)
            if (result) { return result }
        }
        return undefined
    } else {
        return undefined
    }
}

const travel = (tree, fn) => {
    fn(tree)
    if (!tree.children) { return }
    for (let i = 0; i < tree.children.length; i++) {
        travel(tree.children[i], fn) //这个fn很容易忘
    }
}

const removeNode = (tree, node) => {
    let sibling = node.parent.children//这里不用便利，因为node里面又parent的属性，能够直接关联到tree，所以不用遍历tree。
    let index = 0
    for (let i = 1; i < sibling.length; i++) {
        if (sibling[i] === node) {
            index = i
        }
    }
    sibling.splice(index, 1)
}


const tree = createTree(10)
let node2 = addChildren(tree, 20)
let node3 = addChildren(tree, 30)
addChildren(tree, 40)
addChildren(node2, 201)
addChildren(node2, 202)
addChildren(node2, 203)
console.log(tree)
const fn = (node) => { console.log(node.data) }
travel(tree, fn)
removeNode(tree, node3)