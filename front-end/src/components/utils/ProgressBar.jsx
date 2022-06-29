import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  height: 30px;
  width: 100%;

  @-moz-document url-prefix() {
    height: 30px;

    > progress[value] {
      appearance: none;
      background-color: #505e66;
      ::-moz-progress-bar {
        height: 100%;
        background-color: #009ee0;
      }
    }
  }

  > progress[value] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    height: 100%;

    ::-webkit-progress-bar {
      height: 100%;
      background-color: #505e66;
    }

    ::-webkit-progress-value {
      height: 100%;
      background-color: #009ee0;
    }
  }

  span {
    position: absolute;
    color: #fff;
  }
`;

export default function ProgressBar({ value }) {
  return (
    <Container>
      <progress value={value} max={100} />
      <span>{value}%</span>
    </Container>
  );
}
