import React, { useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Button, Form, Table } from "react-bootstrap";
import Header from "../../../Header/HeaderPage";
import {
  userDataAtom,
  loginModals,
} from "../../../../globalStateManagement/index";
import { useAtom } from "jotai";
import SearchingModal from "../../../SearchingModal/SearchingModal";
import { productTY } from "../../../../types/product";
import { AddInboundTY } from "../../../../types/inbound";
import { BusinessPartnerTY } from "../../../../types/businessPartner";

function AddOutboundPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [date, setDate] = useState<Date>(new Date()); //시간
  const [currentNote, setCurrentNote] = useState<string>(""); // 비고

  const [loginModal, setLoginModal] = useAtom(loginModals); // 로그인 모달 불러오기
  const [userData, setUseData] = useAtom(userDataAtom); // 로그인 되어 있는 데이터
  const [searchingProductModal, setSearchingProductModal] =
    useState<boolean>(false); // 프로덕트 서치 모달 켜고 끄끼
  const [productData, setProductData] = useState<productTY[]>([]); // 모달로 찾아온 프로덕트를 저장

  const [searchingBusinessPartnerModal, setSearchingBusinessPartnerModal] =
    useState<boolean>(false); // 비지니스파트너 서치 모달 켜고 끄끼
  const [businessPartnerData, setBusinessPartnerData] = useState<
    BusinessPartnerTY[]
  >([]); // 모달로 찾아온 프로덕트를 저장

  return (
    <AddItemInformationPageBody>
      <HeaderSection>
        <header>
          <Header setDate={setDate} />
        </header>
      </HeaderSection>

      <Title>신규 출고</Title>

      <ProcuctSection>
        <div>
          <InputFieldWrapper>
            <div>product 찾기</div>
            <InputField
              type="text"
              placeholder="프로덕트 찾기 버튼을 눌러주세요."
              value={productData.length > 0 ? productData[0].productName : ""}
            />
          </InputFieldWrapper>
          <Buttons
            onClick={() => {
              setSearchingProductModal(true);
            }}
          >
            찾기
          </Buttons>

          {productData.length > 0 ? (
            <Table striped bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>Product Code</th>
                  <th>Product Name</th>
                  <th>Wholesale Price</th>
                  <th>Retail Price</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{productData[0].productCode}</td>
                  <td>{productData[0].productName}</td>
                  <td>{productData[0].wholesalePrice}</td>
                  <td>{productData[0].retailPrice}</td>
                  <td>
                    {productData[0].date ? productData[0].date.toString() : ""}
                  </td>
                  <td>{productData[0].note}</td>
                  <td>{productData[0].stock}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            ""
          )}

          {searchingProductModal ? (
            <SearchingModal
              Theme="product"
              setDataList={setProductData}
              dataListSearchingKey="productList"
              title="product Searching"
              rowKey={[
                "_id",
                "productName",
                "stock",
                "wholesalePrice",
                "retailPrice",
              ]}
              searchingModal={searchingProductModal}
              setSearchingModal={setSearchingProductModal}
              itemField="productName"
            />
          ) : (
            ""
          )}
        </div>

        <div>
          <InputFieldWrapper>
            <div>Business Partner 찾기</div>
            <InputField
              type="text"
              placeholder="BusinessPartnerPage 찾기 버튼을 눌러주세요."
              value={
                businessPartnerData.length > 0
                  ? businessPartnerData[0].BusinessPartnerName.toString()
                  : ""
              }
            />
          </InputFieldWrapper>
          <Buttons
            onClick={() => {
              setSearchingBusinessPartnerModal(true);
            }}
          >
            찾기
          </Buttons>

          {businessPartnerData.length > 0 ? (
            <Table striped bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>_id</th>
                  <th>Business Partner Name</th>
                  <th>Owner</th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{businessPartnerData[0]._id}</td>
                  <td>{businessPartnerData[0].BusinessPartnerName}</td>
                  <td>{businessPartnerData[0].owner}</td>
                  <td>{businessPartnerData[0].credit}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            ""
          )}

          {searchingBusinessPartnerModal ? (
            <SearchingModal
              Theme="businessPartner"
              setDataList={setBusinessPartnerData}
              dataListSearchingKey="businessPartnerList"
              title="BusinessParter Searching"
              rowKey={["_id", "BusinessPartnerName", "owner", "credit"]}
              searchingModal={searchingBusinessPartnerModal}
              setSearchingModal={setSearchingBusinessPartnerModal}
              itemField="BusinessPartnerName"
            />
          ) : (
            ""
          )}
        </div>
      </ProcuctSection>

      {/* <ItemSection>
        <InputFieldWrapper>
          <div>주문수량</div>
          <InputField
            type="text"
            placeholder="주문 수량"
            value={currentQuantity}
            onChange={(e) => {
              const value = e.target.value;
              setCurrentQuantity(value === "" ? 0 : parseInt(value));
            }}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <div>상품 비고</div>
          <InputField
            type="text"
            placeholder="상품 비고"
            value={currentNote}
            onChange={(e) => {
              const value = e.target.value;
              setCurrentNote(value);
            }}
          />
        </InputFieldWrapper>
      </ItemSection>
      <InputSection>
        <Buttons>입고 삭제</Buttons>
        <Buttons onClick={addInbound}>입고</Buttons>
      </InputSection> */}
    </AddItemInformationPageBody>
  );
}

export default AddOutboundPage;

const AddItemInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const InputSection = styled.section`
  margin: 10px;
`;
const Buttons = styled(Button)``;
const Title = styled.div`
  font-size: 30px;
`;
const ItemSection = styled.section``;
const InputField = styled(Form.Control)`
  width: 300px;
  margin: 0 auto;
`;
const InputFieldWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 10px;
`;
const ProcuctSection = styled.section``;
