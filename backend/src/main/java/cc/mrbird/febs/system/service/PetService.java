package cc.mrbird.febs.system.service;


import cc.mrbird.febs.common.domain.QueryRequest;
import cc.mrbird.febs.system.domain.Dept;
import cc.mrbird.febs.system.domain.Pet;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;

public interface PetService extends IService<Pet> {

    void createPet(Pet pet);

    void deletePet(String[] petIds) throws Exception;

    IPage<Pet> findPetDetail(Pet pet, QueryRequest queryRequest);

     void updatePet(Pet pet);
}
