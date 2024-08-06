import { PaymentService } from "@/services/payments.service";
import { chains } from "@/services/web3Setup";
import { IMembership, IUpgradeMembershipResponse } from "@/types";
import { INetworkResponse, INumberString } from "@/types/web3.type";
import { Link, Typography, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { useEffect, useState } from "react";

type IPaymentHistory = {
  createdAt: string;
  updatedAt: string;
  id: number;
  user_id: string;
  idempotency_key: INumberString;
  amount: INumberString;
  reference_id: string;
  product_type: string;
  type: string;
  currency: string;
  status: string;
  transaction_date: string;
  related_transaction_id: null | number | string;
  payment_method: string;
  payment_method_id: string;
  payment_gateway: string;
  payment_gateway_id: INumberString;
  payment_gateway_transaction_id: string;
  payment_gateway_increment_number: number;
  meta: {
    paymentDescription: string;
    membershipTier: IMembership;
    payload: IUpgradeMembershipResponse;
    signature: string;
    exchangeRate: number;
    assignMembershipTierResponse: {
      code: "OK";
    };
    isAssignMembershipTierSucceeded: boolean;
  };
};

interface IPaymentHistoryProps {
  paymentHistory: IPaymentHistory[];
}

const PaymenTableCellistory = ({ paymentHistory }: IPaymentHistoryProps) => {
  const [networks, setNetworks] = useState<INetworkResponse | null>(null);

  useEffect(() => {
    const getNetworks = () => {
      PaymentService.getNetworks()
        .then((networks) => setNetworks(networks))
        .catch((error) => console.log(error));
    };

    getNetworks();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: "65vh" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Payment Invoice</TableCell>
            <TableCell>Payment Description</TableCell>
            <TableCell>Payment Amount</TableCell>
            <TableCell>Date & Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>TX Hash</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentHistory.map((row: IPaymentHistory) => {
            const networkId = row.payment_gateway_id;
            const networkSelected = networks?.[networkId];
            const chainSelected = chains.find(
              (item) => item.id === Number(networkId)
            );
            const isTokenPayment = row.payment_gateway !== "stripe";
            const explorerUrl =
              (networkSelected?.explorerUrl ||
                chainSelected?.blockExplorers?.default?.url) + "/tx/";
            return (
              <TableRow key={row.id}>
                <TableCell>
                  <Typography noWrap fontSize={14}>
                    {row.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography noWrap fontSize={14} textTransform="capitalize">
                    {row.meta.paymentDescription || "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography noWrap fontSize={14}>
                    {new Intl.NumberFormat("en", {
                      maximumFractionDigits: 2,
                    }).format(
                      Number(
                        (Math.ceil(Number(row.amount) * 100) / 100).toFixed(2)
                      )
                    )}{" "}
                    <Typography textTransform="uppercase" display="inline">
                      {row.currency}
                    </Typography>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography noWrap fontSize={14}>
                    {moment(row.transaction_date).format("YYYY-MM-DD HH:mm")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography noWrap fontSize={14} textTransform="capitalize">
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  {isTokenPayment ? (
                    <Link
                      href={explorerUrl + row.payment_gateway_transaction_id}
                      target="_blank"
                      noWrap
                      overflow="hidden"
                      textOverflow="ellipsis"
                      width="11rem"
                      fontSize={14}
                      display="inline-block"
                    >
                      {row.payment_gateway_transaction_id}
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymenTableCellistory;
