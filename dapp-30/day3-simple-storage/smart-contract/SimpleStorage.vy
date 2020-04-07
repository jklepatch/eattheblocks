data: string[100]

@public
def set(_data: string[100]):
  self.data = _data

@public
@constant
def get -> string[100]
  return self.data
