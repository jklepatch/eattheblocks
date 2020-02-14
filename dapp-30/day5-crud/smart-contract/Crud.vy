struct User:
    id: int128
    name: string[100]

users: public(User[100])
nextId: public(int128)

@public
def createUser(_name: string[100]):
    assert len(_name) != 0
    self.users[self.nextId] = User({id: self.nextId, name: _name})
    self.nextId += 1

@public
@constant
def read(id: int128) -> (int128, string[100]):
    assert id < self.nextId
    return (self.users[id].id, self.users[id].name)

@public
def update(id: int128, name: string[100]):
    assert id < self.nextId and len(self.users[id].name) != 0
    self.users[id].name = name

@public
def destroy(id: int128):
    assert id < self.nextId and len(self.users[id].name) != 0
    self.users[id].name = ''
