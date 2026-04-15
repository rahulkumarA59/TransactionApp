package com.example.transactionapp.repository;

import com.example.transactionapp.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByOrderByDateDescIdDesc();

    List<Transaction> findByTypeIgnoreCaseOrderByDateDescIdDesc(String type);

    List<Transaction> findByCategoryIgnoreCaseOrderByDateDescIdDesc(String category);
}
