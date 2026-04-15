package com.example.transactionapp.service;

import com.example.transactionapp.entity.Transaction;
import com.example.transactionapp.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    public List<Transaction> getAllTransactions() {
        return repository.findAllByOrderByDateDescIdDesc();
    }

    public Transaction getTransactionById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Transaction> getTransactionsByType(String type) {
        return repository.findByTypeIgnoreCaseOrderByDateDescIdDesc(type);
    }

    public List<Transaction> getTransactionsByCategory(String category) {
        return repository.findByCategoryIgnoreCaseOrderByDateDescIdDesc(category);
    }

    public Transaction addTransaction(Transaction transaction) {
        transaction.setId(null);
        return repository.save(transaction);
    }
}
