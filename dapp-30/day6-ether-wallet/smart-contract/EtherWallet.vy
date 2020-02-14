owner: public(address)

@public
def __init__(_owner: address):
    self.owner = _owner

@public
@payable
def deposit():
    pass

@public
def send(to: address, amount: uint256):
    assert msg.sender == self.owner, 'Only owner can send money'
    send(to, amount)

@public
@constant
def balanceOf() -> wei_value:
    return self.balance
