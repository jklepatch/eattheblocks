ids: public(int128[100])
idIndex: int128
    
@public
def addElement(id: int128):
    self.ids[self.idIndex] = id
    self.idIndex += 1

@public
@constant
def get(i: int128) -> int128:
    return self.ids[i]
    
@public
@constant
def getAll() -> int128[100]:
    return self.ids

@public
@constant
def length() -> int128:
    return self.idIndex
