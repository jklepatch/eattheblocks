ids: public(int128[100]) # No dynamic arrays in Vyper :(
idIndex: public(int128)

@public
def addId(id: int128):
    self.ids[self.idIndex] = id
    self.idIndex += 1

@public
@constant
def get(i: uint256) -> uint256:
    return 1
    # return self.ids[i]

@public
@constant
def getAll() -> int128[100]:
    return self.ids

@public
@constant
def length() -> int128:
    return self.idIndex
