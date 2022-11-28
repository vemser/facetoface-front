import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICandidate } from "../interfaces";

interface ICandidateContext {
  candidates: any;
  postCandidate: (data: ICandidate) => void;
  putCandidate: (data: ICandidate) => void;
  deleteCandidate: (id: number) => void;
  getCandidates: (page: number, size: number) => void;
}

interface IChildren {
  children: React.ReactNode;
}

const CandidateContext = createContext({} as ICandidateContext);

export const CandidateProvider: React.FC<IChildren> = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  // post one candidate
  const postCandidate = (data: ICandidate) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // update one candidate
  const putCandidate = (data: ICandidate) => {
    try {
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // delete one candidate
  const deleteCandidate = (id: number) => {
    try {
      console.log(id);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  // get all candidates
  const getCandidates = (page: number, size: number) => {
    try {
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        postCandidate,
        deleteCandidate,
        getCandidates,
        putCandidate,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => {
  return useContext(CandidateContext);
};
