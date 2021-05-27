const sum = (a, b) => {
    return a + b;
};

test('a->1, b->2 out->3', ()=>{expect(sum(1,2)).toBe(3);})
