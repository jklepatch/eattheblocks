pragma solidity ^0.5.0;

import "@studydefi/money-legos/maker/contracts/DssProxyActionsBase.sol";


contract VaultManager is DssProxyActionsBase {
    // Referenced from
    // https://github.com/makerdao/dss-proxy-actions/blob/968b5030523af74d786520a9a664b31fa811c05c/src/DssProxyActions.sol#L583
    function openVault(
        address manager,
        address jug,
        address ethJoin,
        address daiJoin,
        uint wadD
    ) public payable {
        // Opens ETH-A CDP
        bytes32 ilk = bytes32("ETH-A");
        uint cdp = open(manager, ilk, address(this));

        address urn = ManagerLike(manager).urns(cdp);
        address vat = ManagerLike(manager).vat();
        // Receives ETH amount, converts it to WETH and joins it into the vat
        ethJoin_join(ethJoin, urn);
        // Locks WETH amount into the CDP and generates debt
        frob(manager, cdp, toInt(msg.value), _getDrawDart(vat, jug, urn, ilk, wadD));
        // Moves the DAI amount (balance in the vat in rad) to proxy's address
        move(manager, cdp, address(this), toRad(wadD));
        // Allows adapter to access to proxy's DAI balance in the vat
        if (VatLike(vat).can(address(this), address(daiJoin)) == 0) {
            VatLike(vat).hope(daiJoin);
        }

        // Exits DAI to the user's wallet as a token
        DaiJoinLike(daiJoin).exit(msg.sender, wadD);
    }
}
