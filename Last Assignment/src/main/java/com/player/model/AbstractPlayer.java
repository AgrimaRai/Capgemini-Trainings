package com.player.model;

public abstract class AbstractPlayer {
    protected int id;
    protected String name;
    protected String skill;
    protected int exp;
    protected String country;
    protected double overallScore;
    
    public AbstractPlayer() {}
    
    public AbstractPlayer(int id, String name, String skill, int exp, 
                         String country, double overallScore) {
        this.id = id;
        this.name = name;
        this.skill = skill;
        this.exp = exp;
        this.country = country;
        this.overallScore = overallScore;
    }
    
    // Abstract methods to be implemented by concrete class
    public abstract int getId();
    public abstract void setId(int id);
    public abstract String getName();
    public abstract void setName(String name);
    public abstract String getSkill();
    public abstract void setSkill(String skill);
    public abstract int getExp();
    public abstract void setExp(int exp);
    public abstract String getCountry();
    public abstract void setCountry(String country);
    public abstract double getOverallScore();
    public abstract void setOverallScore(double overallScore);
}
