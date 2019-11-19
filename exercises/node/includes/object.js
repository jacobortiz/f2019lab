module.exports = {
    // This won't change if node stays running
    creation: new Date(),
    
    // This changes everytime called
    now: () => new Date() 
}