// J'implémente un graphe
// Je crée le delta de tous les coups que peut jouer un cavalier
// Notre graphe sera croissant : initialement il ne comportera qu'un seul noeud,
// mais on en rajoute à chaque fois qu'on passe par un noeud.


function arraysEquals(a, b) {
    return (a.length === b.length && a.every((e, i) => e === b[i]));
}
function inBoard(position) {
    return (0 <= position[0] && position[0] < 8 &&
            0 <= position[1] && position[1] < 8);
}

function getNextSquares(square) {
    const deltas = [
        {x: -2, y: -1},
        {x: -1, y: -2},
        {x: 1, y: -2},
        {x: 2, y: -1},
        {x: 2, y: 1},
        {x: 1, y: 2},
        {x: -1, y: 2},
        {x: -2, y: 1}
    ];
    const res = [];
    
    for (let delta of deltas) {
        position = [square[0] + delta.y, square[1] + delta.x];
        if (inBoard(position)) {
            res.push(position); 
        }
    }


    return res;
}

function searchPath(position, search) {
    const queue = [];

    // La queue ne stocke pas les noeuds mais les chemins, de la racine
    // (la case initiale) jusqu'à la dernière case ajoutée
    // cela nous permet de retourner directement le chemin à la fin 
    // de la boucle
    queue.push([position]); 

    while (queue.length) {
        // On récupère le dernier chemin ajouté à la queue ;
        // c'est cette opération, à l'aide de la queue, qui produit la BFS
        const path = queue.shift(); 

        // On récupère la dernière case du chemin parcouru jusqu'ici,
        // pour checker s'il s'agit de la case recherchée
        const square = path[path.length - 1];

        // Si la case est celle sur laquelle on veut aller :
        // on retourne le chemin
        if (arraysEquals(square, search)) {
            return path;
        }

        // On récupère toutes les cases adjacentes à la notre,
        // à distance de cavalier
        const nextSquares = getNextSquares(square);
        
        for (let square of nextSquares) {
            // ...et pour chaque cases, on crée un nouveau chemin
            // qui sera simplement le chemin actuel (path)
            // + la nouvelle case à visiter
            const newPath = [...path];
            newPath.push(square);
            queue.push(newPath);
        }
        // Cela nous permet d'effectuer notre BFS sans perdre la trace du chemin
        // parcourue
    }
}

// L'idée est simplement de faire un BFS sans avoir besoin de stocker
// un graphe en mémoire, mais de retenir dans une queue tous les chemins,
// les uns après les autres, puis de retourner le bon 

// Space : 

console.log(searchPath([0, 0], [1, 2]));
console.log(searchPath([0, 0], [3, 3]));
console.log(searchPath([3, 3], [0, 0]));
console.log(searchPath([0, 0], [7, 7]));
console.log(searchPath([7, 7], [0, 0]));
