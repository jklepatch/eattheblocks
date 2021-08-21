// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0;

library AddressStringUtil {
    // converts an address to the uppercase hex string, extracting only len bytes (up to 20, multiple of 2)
    function toAsciiString(address addr, uint256 len) internal pure returns (string memory) {
        require(len % 2 == 0 && len > 0 && len <= 40, "AddressStringUtil: INVALID_LEN");
        bytes memory s = new bytes(len);
        uint256 addrNum = uint256(uint160(addr));
        for (uint256 ii = 0; ii < len ; ii +=2) {
            uint8 b = uint8(addrNum >> (4 * (38 - ii)));
            s[ii] = char(b >> 4);
            s[ii + 1] = char(b & 0x0f);
        }
        return string(s);
    }

    // hi and lo are only 4 bits and between 0 and 16
    // this method converts those values to the unicode/ascii code point for the hex representation
    // uses upper case for the characters
    function char(uint8 b) private pure returns (bytes1 c) {
        if (b < 10) {
            return bytes1(b + 0x30);
        } else {
            return bytes1(b + 0x37);
        }
    }
}
